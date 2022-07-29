interface RegisterDataInterface {
  email: string;
  password: string;
  userProfile: {
    firstName: string;
    lastName: string;
    userName: string;
  }
};

export default RegisterDataInterface;