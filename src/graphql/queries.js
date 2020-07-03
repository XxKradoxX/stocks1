/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
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
export const listUsers = /* GraphQL */ `
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
export const getTransaction = /* GraphQL */ `
  query GetTransaction($id: ID!) {
    getTransaction(id: $id) {
      id
      companyId
      userId
      price
      createdAt
      updatedAt
    }
  }
`;
export const listTransactions = /* GraphQL */ `
  query ListTransactions(
    $filter: ModelTransactionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTransactions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        companyId
        userId
        price
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getShare = /* GraphQL */ `
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
export const listShares = /* GraphQL */ `
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
export const getCompany = /* GraphQL */ `
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
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
      preference
      createdAt
      updatedAt
    }
  }
`;
export const listCompanys = /* GraphQL */ `
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
