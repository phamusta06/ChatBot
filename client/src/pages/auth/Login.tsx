import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import logo from "../../assets/ai.png";
import {useLogin} from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const { loading, login } = useLogin();

  const handleLogin = (values: { email: string; password: string }) => {
    login(values);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row justify-center md:space-y-0 md:space-x-16 items-center mx-5 md:mx-0 md:my-0">
    <Helmet>
    <title>Login</title>

    </Helmet>
      <div className="w-60 md:w-1/3 max-w-sm">
        <motion.img
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          src={logo}
          alt="logo ai"
          draggable={false}
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <div className="text-center m-5">
          <label className="tracking-wider font-semibold">Sign in with</label>
        </div>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                name="email"
                className={`outline-none text-sm w-full px-4 py-2 rounded ${
                  errors.email && touched.email ? "border-red-500" : ""
                }`}
                type="text"
                placeholder="Email Address"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />

              <Field
                name="password"
                className={`outline-none text-sm w-full px-4 py-2 rounded mt-3 ${
                  errors.password && touched.password ? "border-red-500" : ""
                }`}
                type="password"
                placeholder="Password"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />

              <div className="mt-3 text-center md:text-left">
                <button
                  className="mt-3 bg-slate-950 w-full text-white p-4 uppercase rounded text-xs tracking-wider font-semibold"
                  type="submit"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </Form>
          )}
        </Formik>

        <div className="mt-3 font-semibold text-sm text-slate-900 text-center md:text-left">
          Don't have an account?{" "}
          <NavLink className="text-blue-950 hover:underline" to="/signup">
            Register
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
