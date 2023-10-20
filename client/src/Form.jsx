import "./Form.css"
const Form=({HandleSubmit,Handle,form})=>
{
    return(
            
            <div className="Addcontainer">
                <form onSubmit={HandleSubmit}>
                    Name:<input type="text" name="name" onChange={Handle} value={form.name} autoComplete="false"/>
                    Email:<input type="email" name="email" onChange={Handle} value={form.email} autoComplete="false"/>
                    Phone:<input type="number" name="phone"  onChange={Handle} value={form.phone}  autoComplete="false"/>
                    <button  className="submit">Submit</button>
                </form>
            </div>
    )
}
export default Form; 