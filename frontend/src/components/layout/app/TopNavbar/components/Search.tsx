import { FaSearch } from 'react-icons/fa';

export default function Search() {
    return (
        <div className="nav my-3 my-xl-0 px-4 flex-nowrap align-items-center w-50">
            <div className="nav-item w-100">
                <form className="position-relative">
                    <input
                        className="form-control pe-5 bg-transparent"
                        type="search"
                        placeholder="Search"
                        aria-label="Search"
                    />
                    <button
                        className="bg-transparent p-2 position-absolute top-50 end-0 translate-middle-y border-0 text-primary-hover text-reset"
                        type="button"
                    >
                        <FaSearch className="fs-6 " />
                    </button>
                </form>
            </div>
        </div>
    );
}
