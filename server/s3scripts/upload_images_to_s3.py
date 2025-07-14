import os
import boto3

# S3 Config
bucket_name = 'recipehub-images'
region = 'us-east-1'

# Local path relative to this script
script_dir = os.path.dirname(__file__)
local_folder = os.path.join(script_dir, '../public/images/')

# Create S3 client
s3 = boto3.client('s3', region_name=region)

# Upload each .jpg image
for filename in os.listdir(local_folder):
    if filename.endswith('.jpg'):
        file_path = os.path.join(local_folder, filename)
        s3_key = filename

        s3.upload_file(file_path, bucket_name, s3_key)
        print(f'✅ Uploaded {filename} to S3')
