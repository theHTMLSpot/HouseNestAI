import cv2
import numpy as np
import os

def downscale(image):
    # Downscale the image
    down_width = 320
    down_height = 180
    down_points = (down_width, down_height)
    resized_down = cv2.resize(image, down_points, interpolation=cv2.INTER_LINEAR)
    return resized_down

def RGB_to_HEX(image):
    # Convert each RGB pixel to Hex
    hex_image = []
    for row in image:
        hex_row = []
        for pixel in row:
            # Convert RGB to Hex (OpenCV gives the image in RGB format)
            hex_value = '#{:02x}{:02x}{:02x}'.format(pixel[0], pixel[1], pixel[2])
            hex_row.append(hex_value)
        hex_image.append(hex_row)
    return hex_image

def image_to_np_arr(image_path):
    # Check if file exists
    if not os.path.exists(image_path):
        raise FileNotFoundError(f"Image file not found: {image_path}")
    
    # Read the image
    image = cv2.imread(image_path)  # Use imread for file path
    
    # Check if image was loaded successfully
    if image is None:
        raise ValueError(f"Failed to load image from {image_path}")
    
    # Convert the image to RGB (OpenCV reads images in BGR by default)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    
    # Downscale the image
    image = downscale(image)
    
    # Convert the image to a numpy array (though it's already a NumPy array after imread)
    image_np = np.array(image)

    # Save the numpy array to a binary file using NumPy methods
    output_file = "./image_array.npy"
    np.save(output_file, image_np)
    print(f"NumPy array saved to {output_file}")

    # Convert the image to Hex
    hex_image = RGB_to_HEX(image)

    # Optionally, save the hex representation to a text file
    hex_output_file = "./image_hex.txt"
    with open(hex_output_file, 'w') as f:
        for row in hex_image:
            f.write(" ".join(row) + "\n")
    print(f"Hex image saved to {hex_output_file}")

    return image_np, hex_image

# Example usage
image_np, hex_image = image_to_np_arr("./ai_models/preprocessing/test_image.png")
