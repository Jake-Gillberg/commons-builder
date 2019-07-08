/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: comment
// ====================================================

export interface comment_addComment {
  __typename: "AddCommentPayload";
  /**
   * A unique identifier for the client performing the mutation.
   */
  clientMutationId: string | null;
}

export interface comment {
  /**
   * Adds a comment to an Issue or Pull Request.
   */
  addComment: comment_addComment | null;
}

export interface commentVariables {
  id: string;
  body: string;
}
