import "./form.css";

const Form = ({ HandleSubmit, Handle, form }) => {
  return (
    <div className="Addcontainer">
      <form onSubmit={HandleSubmit}>
        Name:
        <input
          type="text"
          name="name"
          onChange={Handle}
          value={form.name}
          autoComplete="off"
          required
        />
        Email:
        <input
          type="email"
          name="email"
          onChange={Handle}
          value={form.email}
          autoComplete="off"
          required
        />
        Phone:
        <input
          type="number"
          name="phone"
          onChange={Handle}
          value={form.phone}
          autoComplete="off"
          required
        />
        Address:
        <input
          type="text"
          name="address"
          onChange={Handle}
          value={form.address}
          autoComplete="off"
          required
        />
        Age:
        <input
          type="number"
          name="age"
          onChange={Handle}
          value={form.age}
          autoComplete="off"
          required
        />
        <button className="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
