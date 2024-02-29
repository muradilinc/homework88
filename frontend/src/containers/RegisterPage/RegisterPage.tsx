const RegisterPage = () => {
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <div className="bg-gray-200 p-[20px] box-border w-[45%] rounded-[8px]">
        <h2 className="text-center text-5xl font-bold mb-[30px]">Sign Up</h2>
        <form className="flex flex-col gap-y-3">
          <input
            className="bg-gray-50 bg-inherit outline-0 border border-gray-300 text-black text-sm rounded-lg focus:ring-gray focus:border-gray block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white"
            name="username"
            // value={state.username}
            // onChange={changeField}
            type="text"
            required
          />
          <input
            className="bg-gray-50 bg-inherit outline-0 border border-gray-300 text-black text-sm rounded-lg focus:ring-gray focus:border-gray block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-white dark:focus:border-white"
            name="password"
            // value={state.password}
            // onChange={changeField}
            type="password"
            required
          />
          {/*{error && <p className="text-red-500 text-sm">{error.message}</p>}*/}
          <button
            className="bg-[#ff6314] rounded-[30px] text-base font-bold py-[8px] text-white capitalize"
            type="submit"
          >
            sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
