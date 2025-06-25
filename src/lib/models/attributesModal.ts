export interface AttributeOption {
  attribute_option_id: number;
  uuid: string;
  attribute_id: number;
  attribute_code: string;
  option_text: string;
  created_at: string;
  updated_at: string;
}

export interface Attribute {
  attribute_id: number;
  uuid: string;
  attribute_code: string;
  attribute_name: string;
  type: string;
  is_required: boolean;
  display_on_frontend: boolean;
  sort_order: number;
  is_filterable: boolean;
  created_at: string;
  updated_at: string;
  options: AttributeOption[];
}

export interface AttributeGroupLink {
  attribute_group_link_id: number;
  attribute_id: number;
  group_id: number;
  created_at: string;
  updated_at: string;
  attribute: Attribute;
}

export interface AttributeGroupResponse {
  attribute_group_id: number;
  uuid: string;
  group_name: string;
  created_at: string;
  updated_at: string;
  links: AttributeGroupLink[];
}
