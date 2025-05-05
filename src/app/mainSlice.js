import api from "../api/api";

// login, register, get all users, get user by id
const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation({
      query: ({ email, firstName, lastName, password }) => ({
        url: "/auth/register",
        method: "POST",
        body: {
          email,
          firstName,
          lastName,
          password,
        },
      }),
      providesTags: ["User"],
    }),

    login: build.mutation({
      query: ({ email, password }) => ({
        url: "/auth/login",
        method: "POST",
        body: {
          email,
          password,
        },
      }),
      providesTags: ["User"],
    }),

    getAllUsers: build.query({
      query: () => ({
        url: "/auth/getAllUsers/",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    getUser: build.query({
      query: (id) => ({
        url: `/auth/getUser/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["User"],
    }),

    deleteUser: build.mutation({
      query: (id) => ({
        url: `auth/deleteUser/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetAllUsersQuery,
  useGetUserQuery,
  useDeleteUserMutation,
} = usersApi;
