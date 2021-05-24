import axios from "axios";
import Router from "next/router";
import React from "react";
import useSWR, { mutate } from "swr";

import ListErrors from "../common/ListErrors";
import checkLogin from "../../lib/utils/checkLogin";
import { SERVER_BASE_URL } from "../../lib/utils/constant";
import storage from "../../lib/utils/storage";

const SettingsForm = () => {
  const [isLoading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState([]);
  const [userInfo, setUserInfo] = React.useState({
    image: "",
    username: "",
    email: "",
    password: "",
  });

  const { data: currentUser } = useSWR("user", storage);
  const isLoggedIn = checkLogin(currentUser);

  React.useEffect(() => {
    if (!isLoggedIn) return;
    setUserInfo({ ...userInfo, ...currentUser });
  }, []);

  const updateState = (field) => (e) => {
    const state = userInfo;
    const newState = { ...state, [field]: e.target.value };
    setUserInfo(newState);
  };

  const submitForm = async (e) => {
    // e.preventDefault();
    // setLoading(true);

    // const user = { ...userInfo };

    // if (!user.password) {
    //   delete user.password;
    // }

    // const { data, status } = await axios.put(
    //   `${SERVER_BASE_URL}/user`,
    //   JSON.stringify({ user }),
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Token ${currentUser?.token}`,
    //     },
    //   }
    // );

    // setLoading(false);

    // if (status !== 200) {
    //   setErrors(data.errors.body);
    // }

    // if (data?.user) {
    //   window.localStorage.setItem("user", JSON.stringify(data.user));
    //   mutate("user", data.user);
    //   Router.push(`/`);
    // }
  };

  return (
    <React.Fragment>
      <ListErrors errors={errors} />
      <form onSubmit={submitForm}>
        <fieldset>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Username"
              value={userInfo.username}
              disabled={true}
              onChange={updateState("username")}
            />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="email"
              placeholder="Email"
              value={userInfo.email}
              disabled={true}
              onChange={updateState("email")}
            />
          </fieldset>

          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="password"
              placeholder="New Password"
              value={userInfo.password}
              disabled={true}
              onChange={updateState("password")}
            />
          </fieldset>

          <button
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            style={{background: "#5c78b8"}}
            disabled={true}
          >
            Atualizar configurações
          </button>
        </fieldset>
      </form>
    </React.Fragment>
  );
};

export default SettingsForm;
