import {ActionBarButton} from "./models/action-bar-button";

export const actionBarCreateButton = (onClick: (selected?: unknown[]) => void): ActionBarButton => ({
  text: 'Add',
  icon: 'add',
  onClick: onClick
});

export const actionBarEditButton = (onClick: (selected?: unknown[]) => void): ActionBarButton => ({
  text: 'Update',
  icon: 'computer',
  onClick: onClick
});

export const actionBarDeleteButton = (onClick: (selected?: unknown[]) => void): ActionBarButton => ({
  text: 'Delete',
  icon: 'delete',
  onClick: onClick
});
