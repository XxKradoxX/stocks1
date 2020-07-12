/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateTransaction = /* GraphQL */ `
  subscription OnCreateTransaction {
    onCreateTransaction {
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
export const onUpdateTransaction = /* GraphQL */ `
  subscription OnUpdateTransaction {
    onUpdateTransaction {
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
export const onDeleteTransaction = /* GraphQL */ `
  subscription OnDeleteTransaction {
    onDeleteTransaction {
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
export const onCreateShare = /* GraphQL */ `
  subscription OnCreateShare {
    onCreateShare {
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
export const onUpdateShare = /* GraphQL */ `
  subscription OnUpdateShare {
    onUpdateShare {
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
export const onDeleteShare = /* GraphQL */ `
  subscription OnDeleteShare {
    onDeleteShare {
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
export const onCreateCompany = /* GraphQL */ `
  subscription OnCreateCompany {
    onCreateCompany {
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
      preference
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCompany = /* GraphQL */ `
  subscription OnUpdateCompany {
    onUpdateCompany {
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
      preference
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCompany = /* GraphQL */ `
  subscription OnDeleteCompany {
    onDeleteCompany {
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
      preference
      createdAt
      updatedAt
    }
  }
`;
