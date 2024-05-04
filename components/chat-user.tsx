export const UserChatBox = ({ UserText }: { UserText: string }) => {
  return (
    <div className="w-fit ml-14 py-3 px-5 gap-5 flex bg-white border-2 border-[#4F46E5] rounded-md justify-end self-end">
      <p className="self-center text-start">{UserText}</p>
    </div>
  )
}
