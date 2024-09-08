// import React, { useState, useMemo } from "react";
// import PropTypes from "prop-types";
// import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
// import { COLORS } from "../../../constants/constants";
// import Button from "../button/Button";

// const Table = React.memo(
//   ({
//     dataSource,
//     columns,
//     actions = [],
//     itemsPerPageOptions = [10, 15, 25],
//   }) => {
//     const [currentPage, setCurrentPage] = useState(1);
//     const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);

//     const totalPages = Math.ceil(dataSource.length / itemsPerPage);

//     const currentItems = useMemo(() => {
//       return dataSource.slice(
//         (currentPage - 1) * itemsPerPage,
//         currentPage * itemsPerPage
//       );
//     }, [currentPage, dataSource, itemsPerPage]);

//     const handlePageChange = (pageNumber) => {
//       setCurrentPage(pageNumber);
//     };

//     const handleItemsPerPageChange = (event) => {
//       setItemsPerPage(parseInt(event.target.value, 10));
//       setCurrentPage(1);
//     };

//     return (
//       <div className="overflow-x-auto">
//         <table
//           className="min-w-full border"
//           style={{
//             backgroundColor: COLORS.tableBackground,
//             borderColor: COLORS.tableBorder,
//           }}
//         >
//           <thead style={{ backgroundColor: COLORS.tableHeaderBackground }}>
//             <tr>
//               {columns.map((col) => (
//                 <th
//                   key={col.key}
//                   className="py-3 px-6 text-left border-b"
//                   style={{
//                     color: COLORS.text,
//                     borderColor: COLORS.tableHeaderBorder,
//                   }}
//                 >
//                   {col.title}
//                 </th>
//               ))}
//               {actions.length > 0 && (
//                 <th
//                   className="py-3 px-6 text-left border-b"
//                   style={{
//                     color: COLORS.text,
//                     borderColor: COLORS.tableHeaderBorder,
//                   }}
//                 >
//                   Actions
//                 </th>
//               )}
//             </tr>
//           </thead>
//           <tbody>
//             {currentItems.map((data, index) => (
//               <tr
//                 key={index}
//                 className="hover:bg-gray-50 transition duration-200 ease-in-out"
//                 style={{
//                   backgroundColor: COLORS.tableRowBackground,
//                   color: COLORS.text,
//                 }}
//               >
//                 {columns.map((col) => (
//                   <td
//                     key={col.key}
//                     className="py-3 px-6 border-b"
//                     style={{
//                       color: COLORS.text,
//                       borderColor: COLORS.tableBorder,
//                     }}
//                   >
//                     {col.render ? col.render(data, data) : data[col.dataIndex]}
//                   </td>
//                 ))}
//                 {actions.length > 0 && (
//                   <td className="py-3 px-6 border-b flex space-x-2">
//                     {actions.map((action, idx) => (
//                       <Button
//                         key={idx}
//                         onClick={() => action.handler(data)}
//                         backgroundColor={
//                           action.backgroundColor || COLORS.primary
//                         }
//                         fontColor={action.fontColor || COLORS.text}
//                         className={action.className}
//                       >
//                         {action.icon} {action.label}{" "}
//                       </Button>
//                     ))}
//                   </td>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div className="flex justify-between items-center my-4">
//           <div className="flex items-center">
//             <span className="mr-2" style={{ color: COLORS.textMuted }}>
//               Rows per page:
//             </span>
//             <select
//               value={itemsPerPage}
//               onChange={handleItemsPerPageChange}
//               className="border rounded-md"
//               style={{
//                 color: COLORS.text,
//                 borderColor: COLORS.border,
//                 backgroundColor: COLORS.secondary,
//               }}
//             >
//               {itemsPerPageOptions.map((option) => (
//                 <option
//                   key={option}
//                   value={option}
//                   style={{ color: COLORS.text }}
//                 >
//                   {option}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <Pagination
//             totalPages={totalPages}
//             currentPage={currentPage}
//             onPageChange={handlePageChange}
//           />
//         </div>
//       </div>
//     );
//   }
// );

// const Pagination = ({ totalPages, currentPage, onPageChange }) => {
//   const pageNumbers = [];

//   for (let i = 1; i <= totalPages; i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <div className="flex items-center">
//       <Button
//         onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
//         backgroundColor={COLORS.paginationButton}
//         fontColor={COLORS.textMuted}
//         className="mx-1 px-2 py-1 rounded"
//         style={{ borderColor: COLORS.border }}
//         disabled={currentPage === 1}
//       >
//         <ChevronLeftIcon className="h-5 w-5" />
//       </Button>
//       {pageNumbers.map((number) => (
//         <Button
//           key={number}
//           onClick={() => onPageChange(number)}
//           backgroundColor={
//             number === currentPage ? COLORS.primary : COLORS.paginationButton
//           }
//           fontColor={
//             number === currentPage ? COLORS.secondary : COLORS.textMuted
//           }
//           className={`mx-1 px-2 py-1 rounded ${
//             number === currentPage ? "font-bold" : ""
//           }`}
//           style={{ borderColor: COLORS.border }}
//         >
//           {number}
//         </Button>
//       ))}
//       <Button
//         onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
//         backgroundColor={COLORS.paginationButton}
//         fontColor={COLORS.textMuted}
//         className="mx-1 px-2 py-1 rounded"
//         style={{ borderColor: COLORS.border }}
//         disabled={currentPage === totalPages}
//       >
//         <ChevronRightIcon className="h-5 w-5" />
//       </Button>
//     </div>
//   );
// };

// Table.propTypes = {
//   dataSource: PropTypes.array.isRequired,
//   columns: PropTypes.arrayOf(
//     PropTypes.shape({
//       title: PropTypes.string.isRequired,
//       key: PropTypes.string.isRequired,
//       dataIndex: PropTypes.string,
//       render: PropTypes.func,
//     })
//   ).isRequired,
//   actions: PropTypes.arrayOf(
//     PropTypes.shape({
//       label: PropTypes.string.isRequired,
//       icon: PropTypes.element,
//       backgroundColor: PropTypes.string,
//       fontColor: PropTypes.string,
//       className: PropTypes.string,
//       handler: PropTypes.func.isRequired,
//     })
//   ),
//   itemsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
// };

// Pagination.propTypes = {
//   totalPages: PropTypes.number.isRequired,
//   currentPage: PropTypes.number.isRequired,
//   onPageChange: PropTypes.func.isRequired,
// };

// export default Table;
import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { COLORS } from "../../../constants/constants";
import Button from "../button/Button";

const Table = React.memo(
  ({
    dataSource = [], // Initialize as an empty array
    columns,
    actions = [],
    itemsPerPageOptions = [10, 15, 25],
  }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);

    // Check if dataSource is an array and handle pagination
    const totalPages = Array.isArray(dataSource)
      ? Math.ceil(dataSource.length / itemsPerPage)
      : 0;

    const currentItems = useMemo(() => {
      return Array.isArray(dataSource)
        ? dataSource.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
          )
        : [];
    }, [currentPage, dataSource, itemsPerPage]);

    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (event) => {
      setItemsPerPage(parseInt(event.target.value, 10));
      setCurrentPage(1);
    };

    return (
      <div className="overflow-x-auto">
        <table
          className="min-w-full border"
          style={{
            backgroundColor: COLORS.tableBackground,
            borderColor: COLORS.tableBorder,
          }}
        >
          <thead style={{ backgroundColor: COLORS.tableHeaderBackground }}>
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="py-3 px-6 text-left border-b"
                  style={{
                    color: COLORS.text,
                    borderColor: COLORS.tableHeaderBorder,
                  }}
                >
                  {col.title}
                </th>
              ))}
              {actions.length > 0 && (
                <th
                  className="py-3 px-6 text-left border-b"
                  style={{
                    color: COLORS.text,
                    borderColor: COLORS.tableHeaderBorder,
                  }}
                >
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {currentItems.map((data, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition duration-200 ease-in-out"
                style={{
                  backgroundColor: COLORS.tableRowBackground,
                  color: COLORS.text,
                }}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className="py-3 px-6 border-b"
                    style={{
                      color: COLORS.text,
                      borderColor: COLORS.tableBorder,
                    }}
                  >
                    {col.render ? col.render(data, data) : data[col.dataIndex]}
                  </td>
                ))}
                {actions.length > 0 && (
                  <td className="py-3 px-6 border-b flex space-x-2">
                    {actions.map((action, idx) => (
                      <Button
                        key={idx}
                        onClick={() => action.handler(data)}
                        backgroundColor={
                          action.backgroundColor || COLORS.primary
                        }
                        fontColor={action.fontColor || COLORS.text}
                        className={action.className}
                      >
                        {action.icon} {action.label}{" "}
                      </Button>
                    ))}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center my-4">
          <div className="flex items-center">
            <span className="mr-2" style={{ color: COLORS.textMuted }}>
              Rows per page:
            </span>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="border rounded-md"
              style={{
                color: COLORS.text,
                borderColor: COLORS.border,
                backgroundColor: COLORS.secondary,
              }}
            >
              {itemsPerPageOptions.map((option) => (
                <option
                  key={option}
                  value={option}
                  style={{ color: COLORS.text }}
                >
                  {option}
                </option>
              ))}
            </select>
          </div>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    );
  }
);

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center">
      <Button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        backgroundColor={COLORS.paginationButton}
        fontColor={COLORS.textMuted}
        className="mx-1 px-2 py-1 rounded"
        style={{ borderColor: COLORS.border }}
        disabled={currentPage === 1}
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </Button>
      {pageNumbers.map((number) => (
        <Button
          key={number}
          onClick={() => onPageChange(number)}
          backgroundColor={
            number === currentPage ? COLORS.primary : COLORS.paginationButton
          }
          fontColor={
            number === currentPage ? COLORS.secondary : COLORS.textMuted
          }
          className={`mx-1 px-2 py-1 rounded ${
            number === currentPage ? "font-bold" : ""
          }`}
          style={{ borderColor: COLORS.border }}
        >
          {number}
        </Button>
      ))}
      <Button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        backgroundColor={COLORS.paginationButton}
        fontColor={COLORS.textMuted}
        className="mx-1 px-2 py-1 rounded"
        style={{ borderColor: COLORS.border }}
        disabled={currentPage === totalPages}
      >
        <ChevronRightIcon className="h-5 w-5" />
      </Button>
    </div>
  );
};

Table.propTypes = {
  dataSource: PropTypes.array.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      dataIndex: PropTypes.string,
      render: PropTypes.func,
    })
  ).isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.element,
      backgroundColor: PropTypes.string,
      fontColor: PropTypes.string,
      className: PropTypes.string,
      handler: PropTypes.func.isRequired,
    })
  ),
  itemsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Table;
