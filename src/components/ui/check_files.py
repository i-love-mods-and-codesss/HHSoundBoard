import os

# List of files you want to check
files_to_check = [
    "accordion.tsx", "alert-dialog.tsx", "alert.tsx", "aspect-ratio.tsx", "avatar.tsx",
    "badge.tsx", "breadcrumb.tsx", "button.tsx", "calendar.tsx", "card.tsx",
    "carousel.tsx", "chart.tsx", "checkbox.tsx", "collapsible.tsx", "command.tsx",
    "context-menu.tsx", "dialog.tsx", "drawer.tsx", "dropdown-menu.tsx", "form.tsx",
    "hover-card.tsx", "input-otp.tsx", "input.tsx", "label.tsx", "menubar.tsx",
    "navigation-menu.tsx", "pagination.tsx", "popover.tsx", "progress.tsx", "radio-group.tsx",
    "resizable.tsx", "scroll-area.tsx", "select.tsx", "separator.tsx", "sheet.tsx",
    "sidebar.tsx", "skeleton.tsx", "slider.tsx", "sonner.tsx", "switch.tsx",
    "table.tsx", "tabs.tsx", "textarea.tsx", "toast.tsx", "toaster.tsx",
    "toggle-group.tsx", "toggle.tsx", "tooltip.tsx", "use-toast.ts"
]

# Folder to check
folder_path = "C:\\Users\\Matti\\Desktop\\w\\soundboard\\32\\src\\components\\ui"  # Change this to your folder path

# Check which files exist and which don't
missing_files = [f for f in files_to_check if not os.path.isfile(os.path.join(folder_path, f))]

if missing_files:
    print("Missing files:")
    for f in missing_files:
        print(f"- {f}")
else:
    print("All files are present!")