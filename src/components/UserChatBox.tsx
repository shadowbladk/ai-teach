

const UserChatBox = ({UserText}: {UserText: string}) => {

  return (
    <div className="w-fit max-w-[480px] p-5 gap-5 flex bg-white border-2 border-primary rounded-md justify-end self-end">
        <p className="self-center text-center">{UserText}</p>
    </div>
  )
}

export default UserChatBox