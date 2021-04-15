import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "@Redux/users/usersActions";
import { Container } from "react-bootstrap";
import { UserDetailsItem } from "./UserDetailsItem";

const UserDetails = ({
  history,
  match: {
    params: { id },
  },
}) => {
  const dispatch = useDispatch();
  const { actionsLoading, userForDetails } = useSelector(
    (state) => ({
      actionsLoading: state.users.actionsLoading,
      userForDetails: state.users.userForDetails,
    }),
    shallowEqual
  );

  useEffect(() => {
    if (id) {
      dispatch(actions.fetchUserForUserDetails(id));
    } else {
      backToUsersList();
    }
    // eslint-disable-next-line
  }, [id, dispatch]);

  const backToUsersList = () => {
    history.push(`/user`);
  };

  const editUserHandler = (id) => {
    history.push(`/user/edit/${id}`);
  };

  const deleteUser = (id) => {
    // server request for deleting user by id
    dispatch(actions.deleteUser(id))
      .then(() => backToUsersList())
      .catch((error) => console.log(error));
  };

  return (
    <Container>
      <UserDetailsItem
        actionsLoading={actionsLoading}
        userForDetails={userForDetails}
        editUserHandler={editUserHandler}
        deleteUserHandler={deleteUser}
      />
    </Container>
  );
};

export default UserDetails;
