// Client-side
import { useQuery, useMutation } from '@apollo/react-hooks'

import {
  GET_USERS,
  GET_USER,
  ADD_USER,
  UPDATE_USER,
  UPDATE_USER_PASSWORD,
  DELETE_USER
} from './queries'

// { data, loading, error } = useGetUsers()
export const useGetUsers = () => useQuery(GET_USERS)

// const { data, loading, error } = useGetUser('email@example.com')
export const useGetUser = (email) => useQuery(GET_USER, { variables: { email } })

// addUser({ variables })
export const useAddUser = () => {
  const [addUserMutation] = useMutation(ADD_USER, {
    update: (cache, { data: { addUser } }) => {
      const { variables } = cache.watches.values().next().value
      const { users } = cache.readQuery({ query: GET_USERS, variables })
      cache.writeQuery({
        query: GET_USERS,
        variables,
        data: {
          users: [...users, addUser]
        }
      })
    }
  })
  return addUserMutation
}

// updateUser({ variables })
export const useUpdateUser = () => {
  const [updateUserMutation] = useMutation(UPDATE_USER, {
    update: (cache, { data: { updateUser } }) => {
      const { variables } = cache.watches.values().next().value
      const { users } = cache.readQuery({ query: GET_UserS, variables })
      cache.writeQuery({
        query: GET_USERS,
        variables,
        data: {
          users: users.map(items => items.id !== updateUser.id ? items : updateUser)
        }
      })
    }
  })
  return updateUserMutation
}

// deleteUser({ variables })
export const useDeleteUser = () => {
  const [deleteUserMutation] = useMutation(DELETE_USER, {
    update: (cache, { data: { deleteUser } }) => {
      const { variables } = cache.watches.values().next().value
      const { users } = cache.readQuery({ query: GET_USERS, variables })
      cache.writeQuery({
        query: GET_USERS,
        variables,
        data: {
          users: users.filter(items => items.id !== deleteUser.id)
        }
      })
    }
  })
  return deleteUserMutation
}
