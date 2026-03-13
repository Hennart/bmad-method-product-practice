---
name: show-product
description: 'Display the currently configured product name and output folder used by agents.'
context_file: ''
---

# Show Active Product

**Goal:** Let the user verify which product folder is currently configured, so agents write/read in the expected `products/<product-name>/docs` location.

## Step 1 — Read current configuration

<action>Read `{project-root}/_bmad/core/config.yaml` and resolve variables.</action>

## Step 2 — Show the active product and folder

<action>Print the current product configuration:
- Product name: {{product_name}}
- Output folder: {output_folder}
</action>
