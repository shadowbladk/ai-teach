export const UserChatBox = ({ UserText }: { UserText: string }) => {
  return (
    <div className="w-fit max-w-[330px] ml-14 py-3 px-5 gap-5 flex bg-white border-2 border-primary rounded-md justify-end self-end">
      <p className="self-center text-center">{UserText}</p>
    </div>
  )
}
