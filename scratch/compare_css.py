import re

# Read the HTML style block content
with open('index.html', 'r', encoding='utf-8') as f:
    html_content = f.read()

style_match = re.search(r'<style>(.*?)</style>', html_content, re.DOTALL)
html_css = style_match.group(1) if style_match else ''

# Read the external CSS content
with open('assets/css/ze-ui.css', 'r', encoding='utf-8') as f:
    ext_css = f.read()

# Helper to normalize CSS by stripping whitespace and comments
def normalize(css):
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.DOTALL) # remove comments
    css = re.sub(r'\s+', '', css) # remove all whitespace
    return css

norm_html_css = normalize(html_css)
norm_ext_css = normalize(ext_css)

print(f"Normalized HTML CSS length: {len(norm_html_css)}")
print(f"Normalized External CSS length: {len(norm_ext_css)}")

# Check differences
if norm_html_css == norm_ext_css:
    print("The CSS contents are identical!")
else:
    print("The CSS contents are DIFFERENT.")
