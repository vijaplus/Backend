// import connection from '../../models/database.ts';

// // common with database
// export const queryPromise = (sql) => {
//     return new Promise((resolve, reject) => {
//       connection.query(sql, (error, results) => {
//         if (error) reject(error);
//         resolve(results);
//       });
//     });
// };

// // common handle asyncHandler
// export const asyncHandler = (handler) => (req, res, next) =>{
//   Promise.resolve(handler(req, res, next)).catch(next);
// };