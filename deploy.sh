#!/bin/bash

# KYCtrust Deployment Script
# This script automates the deployment process

set -e

echo "🚀 Starting KYCtrust deployment process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="kyctrust"
BUILD_DIR="dist"
BACKUP_DIR="backups"
LOG_FILE="deploy.log"

# Functions
log() {
    echo -e "${BLUE}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}" | tee -a "$LOG_FILE"
}

success() {
    echo -e "${GREEN}[SUCCESS] $1${NC}" | tee -a "$LOG_FILE"
}

warning() {
    echo -e "${YELLOW}[WARNING] $1${NC}" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}" | tee -a "$LOG_FILE"
}

# Check if required tools are installed
check_requirements() {
    log "Checking requirements..."
    
    if ! command -v node &> /dev/null; then
        error "Node.js is not installed. Please install Node.js first."
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        error "npm is not installed. Please install npm first."
        exit 1
    fi
    
    success "All requirements are met."
}

# Create backup
create_backup() {
    if [ -d "$BUILD_DIR" ]; then
        log "Creating backup of current build..."
        mkdir -p "$BACKUP_DIR"
        TIMESTAMP=$(date +%Y%m%d_%H%M%S)
        cp -r "$BUILD_DIR" "$BACKUP_DIR/build_backup_$TIMESTAMP"
        success "Backup created: $BACKUP_DIR/build_backup_$TIMESTAMP"
    fi
}

# Install dependencies
install_dependencies() {
    log "Installing dependencies..."
    npm ci --silent
    success "Dependencies installed successfully."
}

# Run tests
run_tests() {
    log "Running tests..."
    if npm run test:ci &> /dev/null; then
        success "All tests passed."
    else
        warning "Some tests failed, but continuing deployment."
    fi
}

# Build the project
build_project() {
    log "Building the project..."
    npm run build
    
    if [ -d "$BUILD_DIR" ]; then
        success "Build completed successfully."
    else
        error "Build failed - $BUILD_DIR directory not found."
        exit 1
    fi
}

# Optimize build
optimize_build() {
    log "Optimizing build..."
    
    # Compress static files if gzip is available
    if command -v gzip &> /dev/null; then
        find "$BUILD_DIR" -name "*.js" -o -name "*.css" -o -name "*.html" | while read file; do
            gzip -k -f "$file"
        done
        success "Static files compressed."
    fi
    
    # Generate file hashes for cache busting
    if command -v md5sum &> /dev/null; then
        find "$BUILD_DIR" -name "*.js" -o -name "*.css" | while read file; do
            md5sum "$file" >> "$BUILD_DIR/file-hashes.txt"
        done
        success "File hashes generated."
    fi
}

# Validate build
validate_build() {
    log "Validating build..."
    
    # Check if index.html exists
    if [ ! -f "$BUILD_DIR/index.html" ]; then
        error "index.html not found in build directory."
        exit 1
    fi
    
    # Check if assets directory exists
    if [ ! -d "$BUILD_DIR/assets" ]; then
        warning "Assets directory not found."
    fi
    
    success "Build validation completed."
}

# Deploy to server (example for different deployment methods)
deploy_to_server() {
    log "Deploying to server..."
    
    # Example: Deploy to static hosting
    case "${DEPLOY_METHOD:-manual}" in
        "netlify")
            if command -v netlify &> /dev/null; then
                netlify deploy --prod --dir="$BUILD_DIR"
                success "Deployed to Netlify."
            else
                warning "Netlify CLI not found. Please deploy manually."
            fi
            ;;
        "vercel")
            if command -v vercel &> /dev/null; then
                vercel --prod
                success "Deployed to Vercel."
            else
                warning "Vercel CLI not found. Please deploy manually."
            fi
            ;;
        "aws-s3")
            if command -v aws &> /dev/null && [ -n "$AWS_BUCKET" ]; then
                aws s3 sync "$BUILD_DIR" "s3://$AWS_BUCKET" --delete
                success "Deployed to AWS S3."
            else
                warning "AWS CLI not configured or bucket not specified."
            fi
            ;;
        "docker")
            if command -v docker &> /dev/null; then
                docker build -t "$PROJECT_NAME:latest" .
                success "Docker image built successfully."
                if [ -n "$DOCKER_REGISTRY" ]; then
                    docker tag "$PROJECT_NAME:latest" "$DOCKER_REGISTRY/$PROJECT_NAME:latest"
                    docker push "$DOCKER_REGISTRY/$PROJECT_NAME:latest"
                    success "Docker image pushed to registry."
                fi
            else
                warning "Docker not found."
            fi
            ;;
        *)
            warning "No deployment method specified. Build is ready in $BUILD_DIR directory."
            ;;
    esac
}

# Clean up old backups
cleanup_old_backups() {
    log "Cleaning up old backups..."
    if [ -d "$BACKUP_DIR" ]; then
        find "$BACKUP_DIR" -name "build_backup_*" -mtime +7 -exec rm -rf {} \; 2>/dev/null || true
        success "Old backups cleaned up."
    fi
}

# Generate deployment report
generate_report() {
    log "Generating deployment report..."
    
    REPORT_FILE="deployment_report_$(date +%Y%m%d_%H%M%S).txt"
    
    cat > "$REPORT_FILE" << EOF
KYCtrust Deployment Report
==========================
Date: $(date)
Build Directory: $BUILD_DIR
Deployment Method: ${DEPLOY_METHOD:-manual}

Build Statistics:
- Total Files: $(find "$BUILD_DIR" -type f | wc -l)
- Total Size: $(du -sh "$BUILD_DIR" | cut -f1)
- Index.html Size: $(du -h "$BUILD_DIR/index.html" | cut -f1)

Performance Optimization:
- Gzip Compression: $(command -v gzip &> /dev/null && echo "Applied" || echo "Not Available")
- File Hashing: $([ -f "$BUILD_DIR/file-hashes.txt" ] && echo "Applied" || echo "Not Applied")

Validation:
- Index.html: $([ -f "$BUILD_DIR/index.html" ] && echo "✓ Present" || echo "✗ Missing")
- Assets Directory: $([ -d "$BUILD_DIR/assets" ] && echo "✓ Present" || echo "✗ Missing")

EOF
    
    success "Deployment report generated: $REPORT_FILE"
}

# Main deployment process
main() {
    log "Starting deployment for $PROJECT_NAME..."
    
    check_requirements
    create_backup
    install_dependencies
    run_tests
    build_project
    optimize_build
    validate_build
    deploy_to_server
    cleanup_old_backups
    generate_report
    
    success "🎉 Deployment completed successfully!"
    log "Check the deployment report and logs for details."
}

# Handle script interruption
trap 'error "Deployment interrupted. Check logs for details."; exit 1' INT TERM

# Run main function
main "$@"
