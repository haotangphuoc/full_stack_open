import { useDispatch } from "react-redux"
import { changeFilter } from "../reducers/filterReducer"

const ChangeFilterForm = () => {
  const dispatch = useDispatch()
  
  const handleChange = (e) => {
    console.log(e.target.value)
    dispatch(changeFilter(e.target.value))
  }

  return(
    <div>
      <form>
        filter <input type="text" name="filter" onChange={e => handleChange(e)}/>
      </form>
      <br />
    </div>
  )
}

export default ChangeFilterForm