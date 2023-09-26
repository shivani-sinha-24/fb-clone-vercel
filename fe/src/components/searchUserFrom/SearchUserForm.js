import React from 'react'
import './searchUserForm.css'

const SearchUserForm = ({findUsers,searchInput,setSearchInput,}) => {
  return (
    <form className='row search-form py-3' onSubmit={findUsers}>
        <div className="col-11">
        <input name="searchusertext"  type="search" className="form-control  " placeholder='&#128269; Search Pepople' autoFocus={true} value={searchInput} onChange={e=>setSearchInput(e.target.value)}/>
        </div>
        <div className="col-1 m-0  p-0" onClick={(e)=>findUsers(e)}>
        <button className="btn m-0" >&#128269;</button>      
        </div>
      </form>
  )
}

export default SearchUserForm
