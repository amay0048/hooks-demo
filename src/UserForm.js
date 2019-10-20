import React from "react";
import { Field, reduxForm } from "redux-form";
import { useUser } from "./store/users";
import { useParams } from "react-router-dom";
import Loader from "./render-helpers/Loader";

const FORM_HANDLE = "USER_FORM";

let UserForm = reduxForm({
  form: FORM_HANDLE
})(props => {
  const { handleSubmit, pristine, reset, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Full Name</label>
        <div>
          <Field
            name="name"
            component="input"
            type="text"
            placeholder="Full Name"
          />
        </div>
      </div>
      <div>
        <label>Username</label>
        <div>
          <Field
            name="username"
            component="input"
            type="text"
            placeholder="Username"
          />
        </div>
      </div>
      <div>
        <label>Email</label>
        <div>
          <Field
            name="email"
            component="input"
            type="email"
            placeholder="Email"
          />
        </div>
      </div>
      <div>
        <label>Phone</label>
        <div>
          <Field
            name="phone"
            component="input"
            type="text"
            placeholder="Phone"
          />
        </div>
      </div>
      <div>
        <label>Website</label>
        <div>
          <Field
            name="website"
            component="input"
            type="text"
            placeholder="Website"
          />
        </div>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
});

export default () => {
  let { id } = useParams();
  const { user, isLoading, isError, persistUserUpdate } = useUser(
    id,
    undefined
  );
  return (
    <Loader isLoading={isLoading} isError={isError}>
      <UserForm initialValues={user} onSubmit={persistUserUpdate} />
    </Loader>
  );
};
