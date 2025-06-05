import Button from './actionButton';

export default function RegisterForm() {
  return (
    <>
      <h2>Registration Form</h2>
      <form>
        <label htmlFor='firstName'>First Name:</label>
        <input type='text' id='firstName' name='firstName' required />

        <label htmlFor='lastName'>Last Name:</label>
        <input type='text' id='lastName' name='lastName' required />

        <label htmlFor='email'>Email:</label>
        <input type='email' id='email' name='email' required />

        <label htmlFor='password'>Password:</label>
        <input type='password' id='password' name='password' required />

        <label htmlFor='confirmPassword'>Confirm Password:</label>
        <input
          type='password'
          id='confirmPassword'
          name='confirmPassword'
          required
        />

        <Button buttonText='Register' />
      </form>
    </>
  );
}
