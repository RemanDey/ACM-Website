import cv2
import numpy as np

def remove_red_pixels_transparent(image_path, output_path, threshold=150, red_sensitivity=0.7):
    """
    Make red or near-red pixels transparent in an image.
    
    Parameters:
    - image_path: Path to input image
    - output_path: Path to save output image (should be .png for transparency)
    - threshold: Red channel intensity threshold (0-255)
    - red_sensitivity: How much more red should be compared to other channels (0-1)
    """
    
    # Read the image
    img = cv2.imread(image_path)
    if img is None:
        print(f"Error: Could not read image from {image_path}")
        return
    
    # Convert BGR to HSV color space (better for color detection)
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    
    # Method 1: Using HSV color space (detects pure reds)
    # Define range for red color in HSV
    # Red in HSV has two ranges because it wraps around 0
    lower_red1 = np.array([0, 70, 50])
    upper_red1 = np.array([10, 255, 255])
    lower_red2 = np.array([170, 70, 50])
    upper_red2 = np.array([180, 255, 255])
    
    # Create masks for red color
    mask1 = cv2.inRange(hsv, lower_red1, upper_red1)
    mask2 = cv2.inRange(hsv, lower_red2, upper_red2)
    hsv_mask = mask1 | mask2
    
    # Method 2: Using RGB/BGR color space (detects near-red pixels)
    # Split into individual channels
    b, g, r = cv2.split(img)
    
    # Calculate relative redness
    total_intensity = b.astype(float) + g.astype(float) + r.astype(float)
    # Avoid division by zero
    total_intensity[total_intensity == 0] = 1
    redness_ratio = r.astype(float) / total_intensity
    
    # Create mask for near-red pixels
    # Pixels are considered red if:
    # 1. Red channel is above threshold
    # 2. Red is significantly stronger than other channels
    rgb_mask = np.logical_and(r > threshold, redness_ratio > red_sensitivity)
    rgb_mask = rgb_mask.astype(np.uint8) * 255
    
    # Combine both masks to get all red/near-red areas
    red_mask = cv2.bitwise_or(hsv_mask, rgb_mask)
    
    # Create alpha channel: 0 (transparent) for red areas, 255 (opaque) for others
    alpha_channel = cv2.bitwise_not(red_mask)
    
    # Convert BGR image to BGRA (adding alpha channel)
    bgra = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)
    
    # Apply transparency: set alpha channel to 0 for red pixels
    bgra[:, :, 3] = alpha_channel
    
    # Save the result as PNG (supports transparency)
    if not output_path.lower().endswith('.png'):
        output_path = output_path.rsplit('.', 1)[0] + '.png'
        print(f"Note: Output file changed to {output_path} to support transparency")
    
    cv2.imwrite(output_path, bgra)
    print(f"Image with transparency saved to {output_path}")
    
    # Optional: Create a version with checkered background for visualization
    # (This helps visualize transparency on opaque displays)
    show_with_checkered_background(bgra, "Result with Transparency Preview")
    
    return bgra

def show_with_checkered_background(bgra_image, window_name="Image"):
    """
    Display transparent image on a checkered background for visualization.
    """
    # Create checkered background
    h, w = bgra_image.shape[:2]
    checker_size = 20
    background = np.zeros((h, w, 3), dtype=np.uint8)
    
    # Create checkered pattern
    for y in range(0, h, checker_size):
        for x in range(0, w, checker_size):
            # Alternate between light gray and dark gray
            if ((x // checker_size) + (y // checker_size)) % 2 == 0:
                color = [200, 200, 200]  # Light gray
            else:
                color = [100, 100, 100]  # Dark gray
            background[y:y+checker_size, x:x+checker_size] = color
    
    # Extract alpha channel and normalize to 0-1
    alpha = bgra_image[:, :, 3].astype(float) / 255.0
    alpha = np.stack([alpha, alpha, alpha], axis=2)
    
    # Extract color channels
    foreground = bgra_image[:, :, :3].astype(float)
    
    # Blend foreground and background
    result = foreground * alpha + background * (1 - alpha)
    result = result.astype(np.uint8)
    
    # Display
    cv2.imshow(window_name, result)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

def remove_red_pixels_with_blur_edges(image_path, output_path, threshold=150, red_sensitivity=0.7, blur_radius=3):
    """
    Make red pixels transparent with smooth edges (feathering).
    
    Parameters:
    - blur_radius: Radius for Gaussian blur to smooth alpha edges
    """
    
    # Read the image
    img = cv2.imread(image_path)
    if img is None:
        print(f"Error: Could not read image from {image_path}")
        return
    
    # Convert BGR to HSV color space
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    
    # HSV masks for red
    lower_red1 = np.array([0, 70, 50])
    upper_red1 = np.array([10, 255, 255])
    lower_red2 = np.array([170, 70, 50])
    upper_red2 = np.array([180, 255, 255])
    
    mask1 = cv2.inRange(hsv, lower_red1, upper_red1)
    mask2 = cv2.inRange(hsv, lower_red2, upper_red2)
    hsv_mask = mask1 | mask2
    
    # RGB masks for near-red
    b, g, r = cv2.split(img)
    total_intensity = b.astype(float) + g.astype(float) + r.astype(float)
    total_intensity[total_intensity == 0] = 1
    redness_ratio = r.astype(float) / total_intensity
    rgb_mask = np.logical_and(r > threshold, redness_ratio > red_sensitivity)
    rgb_mask = rgb_mask.astype(np.uint8) * 255
    
    # Combine masks
    red_mask = cv2.bitwise_or(hsv_mask, rgb_mask)
    
    # Create smooth alpha channel
    # Invert the mask (red areas become 0, non-red areas become 255)
    alpha_channel = cv2.bitwise_not(red_mask)
    
    # Apply Gaussian blur to smooth edges
    if blur_radius > 0:
        alpha_channel = cv2.GaussianBlur(alpha_channel, (2*blur_radius+1, 2*blur_radius+1), 0)
    
    # Convert to BGRA
    bgra = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)
    bgra[:, :, 3] = alpha_channel
    
    # Save as PNG
    if not output_path.lower().endswith('.png'):
        output_path = output_path.rsplit('.', 1)[0] + '.png'
    
    cv2.imwrite(output_path, bgra)
    print(f"Image with smooth transparency saved to {output_path}")
    
    return bgra

def batch_remove_red_transparent(input_folder, output_folder, file_extension='.jpg'):
    """
    Process all images in a folder, making red pixels transparent.
    """
    import os
    import glob
    
    # Create output folder if it doesn't exist
    os.makedirs(output_folder, exist_ok=True)
    
    # Get all image files
    image_files = glob.glob(os.path.join(input_folder, f'*{file_extension}'))
    image_files += glob.glob(os.path.join(input_folder, f'*.png'))
    
    for img_path in image_files:
        filename = os.path.basename(img_path)
        # Change extension to .png for output
        output_filename = filename.rsplit('.', 1)[0] + '.png'
        output_path = os.path.join(output_folder, output_filename)
        remove_red_pixels_transparent(img_path, output_path)
        print(f"Processed: {filename} -> {output_filename}")

if __name__ == "__main__":
    # Example 1: Process single image with basic transparency
    input_image = "ss.png"  # Change this to your image path
    output_image = "output_transparent.png"  # Should be .png for transparency
    
    # Basic version - sharp edges
    print("Processing with sharp transparency edges...")
    result1 = remove_red_pixels_transparent(
        input_image, 
        "output_sharp.png",
        threshold=150, 
        red_sensitivity=0.7
    )
    
    # Version with smooth edges (feathered)
    print("\nProcessing with smooth transparency edges...")
    result2 = remove_red_pixels_with_blur_edges(
        input_image,
        "output_smooth.png",
        threshold=150,
        red_sensitivity=0.7,
        blur_radius=3  # Adjust for smoother edges (0 = sharp)
    )
    
    print("\nProcessing complete!")
    print("Output files saved as:")
    print("1. output_sharp.png - Sharp transparency edges")
    print("2. output_smooth.png - Smooth transparency edges")
    
    # Example 3: Process multiple images in a folder
    # batch_remove_red_transparent("input_folder/", "output_folder/")