import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import logo from "../../assets/ai.png";
import { useSignup } from "../../hooks/useAuth";
import { Helmet } from "react-helmet-async";

interface SignupFormValues {
  username: string;
  email: string;
  password: string;
}

const Signup = () => {
  const { signup } = useSignup();

  const initialValues: SignupFormValues = {
    username: '',
    email: '',
    password: ''
  };

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
  });

  const handleSubmit = (values: SignupFormValues, { setSubmitting }: FormikHelpers<SignupFormValues>) => {
    signup(values);
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row justify-center md:space-y-0 md:space-x-16 items-center mx-5 md:mx-0 md:my-0">
      <Helmet>
        <title>Sign up</title>
      </Helmet>
      <div className="w-60 md:w-1/3 max-w-sm">
        <motion.img
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          draggable={false}
          src={logo} alt="logo ai"
        />
      </div>
      <div className="md:w-1/3 max-w-sm">
        <div className="text-center m-5">
          <label className="tracking-wider font-semibold">Create account</label>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field
                name="username"
                type="text"
                placeholder="Your Name"
                className="outline-none text-sm w-full px-4 py-2 rounded"
              />
              <ErrorMessage name="username" component="div" className="text-red-500 text-xs mt-1" />

              <Field
                name="email"
                type="email"
                placeholder="Email Address"
                className="outline-none text-sm w-full px-4 py-2 mt-3 rounded"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />

              <Field
                name="password"
                type="password"
                placeholder="Password"
                className="outline-none text-sm w-full px-4 py-2 rounded mt-3"
              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />

              <div className="text-center md:text-left">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-3 bg-slate-950 w-full text-white p-4 uppercase rounded text-xs tracking-wider font-semibold"
                >
                  Create an account
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="mt-3 font-semibold text-sm text-slate-900 text-center md:text-left">
          Already have an account?{" "}
          <NavLink
            className="text-blue-950 hover:underline hover:underline-offset-4"
            to="/login"
          >
            Login here
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Signup;