---
name: set-product
description: 'Configure the active product name so that agents write and search documentation under products/<product-name>/'
context_file: ''
---

# Set Active Product

**Goal:** Ensure the agents know which product you are working on so that output files are written to `products/<product-name>/docs` and so that `/bmad-help` can locate context for that product.

## Step 1 — Ask for the product name

<ask>What is the product name? (Example: `product-portal`, `checkout-platform`)</ask>

## Step 2 — Confirm the product folder structure

<action>Ensure `{project-root}/products/{{product_name}}/docs` exists. Create it if needed.</action>

## Step 3 — Update core config

<action>Update `{project-root}/_bmad/core/config.yaml`:
- Set `product_name: {{product_name}}`
- Set `output_folder: "{project-root}/products/{{product_name}}/docs"`
</action>

## Step 4 — Verify and report

<action>Print a confirmation message: "Configuration updated. Agents will now use products/{{product_name}}/docs as the output folder."</action>
