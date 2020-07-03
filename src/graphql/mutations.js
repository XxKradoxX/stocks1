/* eslint-disable */
// this is an auto generated file. This will be overwritten
// USER
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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

// TRANSACTION
export const createTransaction = /* GraphQL */ `
  mutation CreateTransaction(
    $input: CreateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    createTransaction(input: $input, condition: $condition) {
      id
      companyId
      userId
      price
      createdAt
      updatedAt
    }
  }
`;
export const updateTransaction = /* GraphQL */ `
  mutation UpdateTransaction(
    $input: UpdateTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    updateTransaction(input: $input, condition: $condition) {
      id
      companyId
      userId
      price
      createdAt
      updatedAt
    }
  }
`;
export const deleteTransaction = /* GraphQL */ `
  mutation DeleteTransaction(
    $input: DeleteTransactionInput!
    $condition: ModelTransactionConditionInput
  ) {
    deleteTransaction(input: $input, condition: $condition) {
      id
      companyId
      userId
      price
      createdAt
      updatedAt
    }
  }
`;

// SHARE
export const createShare = /* GraphQL */ `
  mutation CreateShare(
    $input: CreateShareInput!
    $condition: ModelShareConditionInput
  ) {
    createShare(input: $input, condition: $condition) {
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
export const updateShare = /* GraphQL */ `
  mutation UpdateShare(
    $input: UpdateShareInput!
    $condition: ModelShareConditionInput
  ) {
    updateShare(input: $input, condition: $condition) {
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
export const deleteShare = /* GraphQL */ `
  mutation DeleteShare(
    $input: DeleteShareInput!
    $condition: ModelShareConditionInput
  ) {
    deleteShare(input: $input, condition: $condition) {
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

// COMPANY
export const createCompany = /* GraphQL */ `
  mutation CreateCompany(
    $input: CreateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    createCompany(input: $input, condition: $condition) {
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
export const updateCompany = /* GraphQL */ `
  mutation UpdateCompany(
    $input: UpdateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    updateCompany(input: $input, condition: $condition) {
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
export const deleteCompany = /* GraphQL */ `
  mutation DeleteCompany(
    $input: DeleteCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    deleteCompany(input: $input, condition: $condition) {
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
