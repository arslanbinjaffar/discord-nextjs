
const layoutPage = ({children}:{children:React.ReactNode}) => {
    return (  
        <div className="bg-slate-600 h-[100vh] justify-center items-center flex">
            {children}
        </div>
    );
}
 
export default layoutPage;