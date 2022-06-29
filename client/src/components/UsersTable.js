import React, { useContext } from "react";
import MaterialTable from "material-table";
import tableIcons from "../Icons";
import axios from "axios";
import AuthContext from "../context/AuthProvider";
import Login from "../pages/Login";

const UserTable = () => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  return (
    <>
      {user.role === "admin" ? (
        <div style={{ maxWidth: "100%" }}>
          <MaterialTable
            columns={[
              { title: "FirstName", field: "firstname" },
              { title: "LastName", field: "lastname" },
              { title: "Sex", field: "sex" },
              {
                title: "Role",
                field: "role",
                // lookup: { 34: "İstanbul", 63: "Şanlıurfa" },
              },
              {
                title: "Phone",
                field: "phone",
              },
            ]}
            options={{
              debounceInterval: 700,
              selection: true,
              headerStyle: {
                backgroundColor: "#f1f5f8",
                // color: '#FFF'
              },
              exportButton: true,
              filtering: true,
              sorting: true,
            }}
            data={(query) =>
              new Promise((resolve, reject) => {
                let url = "http://localhost:4000/users?";
                if (query.search) {
                  url += `firstname=${query.search}`;
                }
                if (query.orderBy) {
                  if (query.orderDirection === "asc") {
                    url += `&sort=${query.orderBy.field}`;
                  } else {
                    url += `&sort=-${query.orderBy.field}`;
                  }

                  console.log(url);
                }
                if (query.filters.length) {
                  const filter = query.filters.map((filter) => {
                    return `&${filter.column.field}${filter.operator}${filter.value}`;
                  });
                  url += filter.join(" ");
                }
                url += `&page=${query.page + 1}`;
                url += `&limit=${query.pageSize}`;
                console.log(query);

                axios
                  .get(url, { headers: { authorization: `Bearer ${token}` } })
                  .then((res) => {
                    resolve({
                      data: res.data.data, // your data array
                      page: query.page, // current page number
                      totalCount: res.data.total, // total row number
                    });
                  })
                  .catch((err) => console.log(err.response));
              })
            }
            title="System Users"
            icons={tableIcons}
          />
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default UserTable;
