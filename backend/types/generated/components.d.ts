import type { Schema, Attribute } from '@strapi/strapi';

export interface PageImage extends Schema.Component {
  collectionName: 'components_page_images';
  info: {
    displayName: 'Image';
    icon: 'picture';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    alt: Attribute.String;
    image: Attribute.Media & Attribute.Required;
  };
}

export interface PageParagraph extends Schema.Component {
  collectionName: 'components_page_paragraphs';
  info: {
    displayName: 'Paragraph';
    icon: 'bold';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    content: Attribute.RichText &
      Attribute.Required &
      Attribute.CustomField<
        'plugin::ckeditor.CKEditor',
        {
          output: 'HTML';
          preset: 'rich';
        }
      >;
  };
}

declare module '@strapi/strapi' {
  export module Shared {
    export interface Components {
      'page.image': PageImage;
      'page.paragraph': PageParagraph;
    }
  }
}
