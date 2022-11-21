export interface ActionBarButton {
  text: string;
  icon?: string;
  onClick: (selectedItem: unknown[]) => any;
}
