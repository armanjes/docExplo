const Profile = () => {
  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      <img
        className="w-36 rounded"
        src="https://armanjes.netlify.app/assets/profile-pic-BzIVvLdT.png"
        alt=""
      />
      <p className="font-medium text-3xl text-neutral-800 mt-4">John Doe</p>
      <hr className="bg-zinc-400 h-[1px] border-none" />
      <div>
        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>

        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Email id:</p>
          <p className="text-blue-500">doe@gmail.com</p>

          <p className="font-medium">Phone:</p>
          <p className="text-blue-400">0000</p>
          <p className="font-medium">Address:</p>
          <p className="text-gray-500">
            Khulna
            <br />
            Bagladesh
          </p>
        </div>
      </div>
      <div>
        <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Gender:</p>
          <p className="text-gray-400">Male</p>
          <p className="font-medium">Birthday:</p>

          <p className="text-gray-400">01-01-2020</p>
        </div>
      </div>

      <div className="mt-10">
        <button
          className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
        >
          Edit
        </button>
      </div>
    </div>
  );
};
export default Profile;
