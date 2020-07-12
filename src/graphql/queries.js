/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUseQuery = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      description
      cardInfo
      phoneNumber
      transactions {
        items {
          id
          companyId
          userId
          price
          units
          createdAt
          updatedAt
        }
        nextToken
      }
      shares {
        items {
          id
          companyId
          userId
          units
          listPrice
          listUnits
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsersQuery = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        description
        cardInfo
        phoneNumber
        transactions {
          nextToken
        }
        shares {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const getTransactionQuery = /* GraphQL */ `
  query GetTransaction($id: ID!) {
    getTransaction(id: $id) {
      id
      companyId
      userId
      price
      units
      createdAt
      updatedAt
    }
  }
`;
export const listTransactionsByCompanyQuery = /* GraphQL */ `
  query getTransactions(
    $id: ID!
    $gt: String! 
  ) {
    getCompany(id: $id) {
      id
      transactions(createdAt: { gt: $gt }) {
        items {
          id
          createdAt
          units
          price
        }
      }
    }
  }
`;
export const listTransactionsByUserQuery = /* GraphQL */ `
  query ListTransactions(
    $id: ID!
  ) {
    getUser(id: $id) {
      id
      transactions(sortDirection: DESC,) {
        items {
          companyId
          id
          createdAt
          units
          price
        }
      }
    }
  }
`;

export const getShareQuery = /* GraphQL */ `
  query GetShare($id: ID!) {
    getShare(id: $id) {
      id
      companyId
      userId
      units
      listPrice
      listUnits
      createdAt
      updatedAt
    }
  }
`;
export const listSharesQuery = /* GraphQL */ `
  query ListShares(
    $filter: ModelShareFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listShares(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        companyId
        userId
        units
        listPrice
        listUnits
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

export const getCompanyQuery = /* GraphQL */ `
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
      id
      email
      description
      cardInfo
      phoneNumber
      preference
      createdAt
    }
  }
`;
export const listCompanysQuery = /* GraphQL */ `
  query ListCompanys(
    $filter: ModelCompanyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCompanys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        description
        cardInfo
        phoneNumber
        transactions {
          nextToken
        }
        shares {
          nextToken
        }
        preference
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
