/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "query BaseQuery($locale: I18NLocaleCode, $filters: PageFiltersInput) {\n  menu(locale: $locale) {\n    ...MenuFrament\n  }\n  pages(filters: $filters, locale: $locale) {\n    data {\n      id\n      attributes {\n        cover {\n          data {\n            attributes {\n              height\n              alternativeText\n              caption\n              name\n              url\n              width\n            }\n          }\n        }\n        title\n        page {\n          ... on Error {\n            code\n            message\n          }\n          ... on ComponentPageParagraph {\n            id\n            title\n            content\n          }\n          ... on ComponentPageImage {\n            id\n            title\n            alt\n            image {\n              data {\n                attributes {\n                  alternativeText\n                  caption\n                  height\n                  width\n                  url\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}": types.BaseQueryDocument,
    "fragment MenuFrament on MenuEntityResponse {\n  data {\n    attributes {\n      pages {\n        data {\n          id\n          attributes {\n            slug\n            title\n          }\n        }\n      }\n    }\n  }\n}": types.MenuFramentFragmentDoc,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query BaseQuery($locale: I18NLocaleCode, $filters: PageFiltersInput) {\n  menu(locale: $locale) {\n    ...MenuFrament\n  }\n  pages(filters: $filters, locale: $locale) {\n    data {\n      id\n      attributes {\n        cover {\n          data {\n            attributes {\n              height\n              alternativeText\n              caption\n              name\n              url\n              width\n            }\n          }\n        }\n        title\n        page {\n          ... on Error {\n            code\n            message\n          }\n          ... on ComponentPageParagraph {\n            id\n            title\n            content\n          }\n          ... on ComponentPageImage {\n            id\n            title\n            alt\n            image {\n              data {\n                attributes {\n                  alternativeText\n                  caption\n                  height\n                  width\n                  url\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query BaseQuery($locale: I18NLocaleCode, $filters: PageFiltersInput) {\n  menu(locale: $locale) {\n    ...MenuFrament\n  }\n  pages(filters: $filters, locale: $locale) {\n    data {\n      id\n      attributes {\n        cover {\n          data {\n            attributes {\n              height\n              alternativeText\n              caption\n              name\n              url\n              width\n            }\n          }\n        }\n        title\n        page {\n          ... on Error {\n            code\n            message\n          }\n          ... on ComponentPageParagraph {\n            id\n            title\n            content\n          }\n          ... on ComponentPageImage {\n            id\n            title\n            alt\n            image {\n              data {\n                attributes {\n                  alternativeText\n                  caption\n                  height\n                  width\n                  url\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "fragment MenuFrament on MenuEntityResponse {\n  data {\n    attributes {\n      pages {\n        data {\n          id\n          attributes {\n            slug\n            title\n          }\n        }\n      }\n    }\n  }\n}"): (typeof documents)["fragment MenuFrament on MenuEntityResponse {\n  data {\n    attributes {\n      pages {\n        data {\n          id\n          attributes {\n            slug\n            title\n          }\n        }\n      }\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;