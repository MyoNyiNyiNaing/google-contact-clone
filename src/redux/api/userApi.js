import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({baseUrl: `  https://contact-app.mmsdev.site/api/v1`}),
    tagTypes: ['user'],
    endpoints: (builder) => ({
        getProfile : builder.query({
            query: (token) => ({
                url: `/user-profile`,
                headers : {authorization : `Bearer ${token}`}
            }),
            providesTags: ['user']
        }),
        changePassword : builder.mutation({
            query: ({token, userPassword}) => ({
                url: `change-password`,
                method: "POST",
                headers : {authorization : `Bearer ${token}`},
                body: userPassword
            }),
            invalidatesTags: ['user']
        })
    })
})

export const {useGetProfileQuery, useChangePasswordMutation} = userApi;