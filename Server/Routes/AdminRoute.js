import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import multer from 'multer';

const router = express.Router();

router.post("/adminlogin", (req, res) => {
    const sql = "SELECT * from admin Where username = ? and password = ?";
    con.query(sql, [req.body.username, req.body.password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query error" });
        if (result.length > 0) {
            const username = result[0].username;
            const token = jwt.sign({ role: "admin", username: username, id: result[0].id },
                "jwt_secret_key", { expiresIn: "1d" }
            );
            res.cookie('token', token)
            return res.json({ loginStatus: true });
        } else {
            return res.json({ loginStatus: false, Error: "wrong username or password" });
        }
    });
});

const upload = multer(); // Configures multer with default storage and limits

router.post('/add_employee', upload.none(), (req, res) => {
    const sql = `INSERT INTO employee (name, address, gender, birth, civil_status, branch_id, position, 
    start_date, grade, category_id, appointment_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        req.body.name,
        req.body.address,
        req.body.gender,
        req.body.birth,
        req.body.civil_status,
        req.body.branch_id,
        req.body.position,
        req.body.start_date,
        req.body.grade,
        req.body.category_id,
        req.body.appointment_date
    ];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error("Failed to insert employee:", err); // Log the detailed error to the console
            return res.json({ Status: false, Error: "Failed to insert employee: " + err.message }); // Send a detailed error message in the response
        }
        return res.json({ Status: true });
    });

});

router.post('/add_dependent', upload.none(), (req, res) => {
    const sql = `INSERT INTO dependent (employee_id, name, gender, birth, relationship) VALUES (?, ?, ?, ?, ?)`;

    const values = [
        req.body.employee_id,
        req.body.name,
        req.body.gender,
        req.body.birth,
        req.body.relationship
    ];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error("Failed to insert dependent :", err); // Log the detailed error to the console
            return res.json({ Status: false, Error: "Failed to insert dependent: " + err.message }); // Send a detailed error message in the response
        }
        return res.json({ Status: true });
    });

});

router.post('/add_branch', upload.none(), (req, res) => {
    const sql = `INSERT INTO branch (branch_name,branch_address,area_manager_id ) VALUES (?,?,?)`;

    const values = [
        req.body.branch_name,
        req.body.branch_address,
        req.body.area_manager_id,
    ];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error("Failed to insert transfer_request :", err); // Log the detailed error to the console
            return res.json({ Status: false, Error: "Failed to transfer_request: " + err.message }); // Send a detailed error message in the response
        }
        return res.json({ Status: true });
    });

});

router.post('/add_transfer_request', upload.none(), (req, res) => {
    const sql = `INSERT INTO transfer_request (employee_id, description, request_date, title, type, transferposition, status, cycle_id, hr_decision, hr_comment) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)`;

    const values = [
        req.body.employee_id,
        req.body.description,
        req.body.request_date,
        req.body.title,
        req.body.type,
        req.body.transferposition,
        req.body.status,
        req.body.cycle_id,
        req.body.hr_decision,
        req.body.hr_comment,
    ];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error("Failed to insert transfer_request :", err); // Log the detailed error to the console
            return res.json({ Status: false, Error: "Failed to transfer_request: " + err.message }); // Send a detailed error message in the response
        }
        return res.json({ Status: true });
    });

});

router.post('/add_transfer_cycle', upload.none(), (req, res) => {
    const sql = `INSERT INTO cycle (closing_date) VALUES (?)`;

    const values = [
        req.body.closing_date,
    ];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error("Failed to insert transfer_request :", err); // Log the detailed error to the console
            return res.json({ Status: false, Error: "Failed to transfer_request: " + err.message }); // Send a detailed error message in the response
        }
        return res.json({ Status: true });
    });

});

router.post('/make_transfer_shedule', upload.none(), (req, res) => {
    const sql = `INSERT INTO transfer_schedule (branch_id,employee_id, employee_name, employee_address, employee_birth, employee_position, present_branch, employee_start_date, employee_grade, period, description,transfer_branch,hr_comment) VALUES (?, ?, ?, ?, ?,?,?,?,?,?,?,?,?)`;

    const values = [
        req.body.branch_id,
        req.body.employee_id,
        req.body.employee_name,
        req.body.employee_address,
        req.body.employee_birth,
        req.body.employee_position,
        req.body.present_branch,
        req.body.employee_start_date,
        req.body.employee_grade,
        req.body.period,
        req.body.description,
        req.body.trnasfer_branch,
        req.body.hr_comment,

    ];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error("Failed to insert transfer_shedule :", err); // Log the detailed error to the console
            return res.json({ Status: false, Error: "Failed to transfer_shedule: " + err.message }); // Send a detailed error message in the response
        }
        return res.json({ Status: true });
    });

});

router.post('/add_area_manger_comment', upload.none(), (req, res) => {
    const sql = `
        UPDATE transfer_schedule 
        SET comment_1 = ?, comment_2 = ?, comment_3 = ? 
        WHERE employee_id = ?
    `;

    const values = [
        req.body.comment_1,
        req.body.comment_2,
        req.body.comment_3,
        req.body.employee_id
    ];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error("Failed to add area manger comment :", err); // Log the detailed error to the console
            return res.json({ Status: false, Error: "Failed to add area manger comment: " + err.message }); // Send a detailed error message in the response
        }
        return res.json({ Status: true });
    });

});

router.post('/add_final_decision', upload.none(), (req, res) => {
    const sql = `
        UPDATE transfer_schedule 
        SET final_decision = ? 
        WHERE employee_id = ?
    `;

    const values = [
        req.body.final_decision,
        req.body.employee_id
    ];

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error("Failed to add final decision :", err); // Log the detailed error to the console
            return res.json({ Status: false, Error: "Failed to add final decision: " + err.message }); // Send a detailed error message in the response
        }
        return res.json({ Status: true });
    });

});

router.get('/employee', (req, res) => {
    const sql = "SELECT * FROM employee";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
});

router.get('/category', (req, res) => {
    const sql = "SELECT * FROM category";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: " category Query Error" })
        return res.json({ Status: true, Result: result })
    })
});

router.get('/branch', (req, res) => {
    const sql = "SELECT * FROM branch";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: " branch Query Error" })
        return res.json({ Status: true, Result: result })
    })
});

router.get('/dependent', (req, res) => {
    const sql = "SELECT * FROM dependent";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "dependent Query Error" })
        return res.json({ Status: true, Result: result })
    })
});

router.get('/cycle', (req, res) => {
    const sql = "SELECT * FROM cycle";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "cycle Query Error" })
        return res.json({ Status: true, Result: result })
    })
});

router.get('/transferrequest', (req, res) => {
    const sql = "SELECT * FROM transfer_request";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "transfer_request Query Error" })
        return res.json({ Status: true, Result: result })
    })
});

router.get('/transfershedul', (req, res) => {
    const sql = "SELECT * FROM transfer_schedule";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "transfer_schedule Query Error" })
        return res.json({ Status: true, Result: result })
    })
});
router.get('/are_manager', (req, res) => {
    const sql = "SELECT * From are_manager";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "are_manager Query Error" })
        return res.json({ Status: true, Result: result })
    })
});

// Search employees with greater experience
router.get('/search_employee_by_experience_greater', (req, res) => {
    const { experience } = req.query;
    const sql = "SELECT * FROM employee WHERE grade > ?";
    con.query(sql, [experience], (err, result) => {
        if (err) {
            console.error("Failed to retrieve employees:", err);
            return res.json({ Status: false, Error: "Database query error" });
        }
        return res.json({ Status: true, Result: result });
    });
});

// Search employees with lesser experience
router.get('/search_employee_by_experience_less', (req, res) => {
    const { experience } = req.query;
    const sql = "SELECT * FROM employee WHERE grade < ?";
    con.query(sql, [experience], (err, result) => {
        if (err) {
            console.error("Failed to retrieve employees:", err);
            return res.json({ Status: false, Error: "Database query error" });
        }
        return res.json({ Status: true, Result: result });
    });
});

// Search employee by name
router.get('/search_employee_by_name', (req, res) => {
    const { name } = req.query;
    const sql = "SELECT * FROM employee WHERE name LIKE ?";
    con.query(sql, [`%${name}%`], (err, result) => {
        if (err) {
            console.error("Failed to retrieve employees by name:", err);
            return res.json({ Status: false, Error: "Database query error" });
        }
        return res.json({ Status: true, Result: result });
    });
});

// Search employee by employee number
router.get('/search_employee_by_no', (req, res) => {
    const { employeeNo } = req.query;
    const sql = "SELECT * FROM employee WHERE id = ?";
    con.query(sql, [employeeNo], (err, result) => {
        if (err) {
            console.error("Failed to retrieve employees by number:", err);
            return res.json({ Status: false, Error: "Database query error" });
        }
        return res.json({ Status: true, Result: result });
    });
});

// Search employee by category
router.get('/search_employee_by_category', (req, res) => {
    const { category } = req.query;
    const sql = "SELECT * FROM employee WHERE category_id = ?";
    con.query(sql, [category], (err, result) => {
        if (err) {
            console.error("Failed to retrieve employees by category:", err);
            return res.json({ Status: false, Error: "Database query error" });
        }
        return res.json({ Status: true, Result: result });
    });
});

// Fetch all employee numbers
router.get('/employee_numbers', (req, res) => {
    const sql = "SELECT id FROM employee";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Failed to fetch employee numbers" });
        return res.json({ Status: true, Result: result });
    });
});

// Fetch all branches
router.get('/branches', (req, res) => {
    const sql = "SELECT branch_name FROM branch";
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Failed to fetch branches" });
        return res.json({ Status: true, Result: result });
    });
});

// Search employee details by mployeeNumber, branch, or startDate
router.get('/search_employee_details', (req, res) => {
    let { employeeNumber, branch, startDate } = req.query;
    let conditions = [];
    let values = [];

    if (employeeNumber) {
        conditions.push("e.id = ?");
        values.push(employeeNumber);
    }
    if (branch) {
        conditions.push("b.branch_name = ?");
        values.push(branch);
    }
    if (startDate) {
        conditions.push("e.start_date = ?");
        values.push(startDate);
    }

    if (conditions.length === 0) {
        return res.json({ Status: false, Error: "No search parameters provided" });
    }

    const sql = `SELECT e.* FROM employee e JOIN branch b ON e.branch_id = b.id WHERE ${conditions.join(" AND ")}`;

    con.query(sql, values, (err, result) => {
        if (err) {
            console.error("Failed to retrieve employee details:", err);
            return res.json({ Status: false, Error: "Database query error" });
        }
        if (result.length > 0) {
            return res.json({ Status: true, Result: result });
        } else {
            return res.json({ Status: false, Error: "No results found" });
        }
    });
});

// Reject transfer request
router.post('/reject_transfer_request', upload.none(), (req, res) => {
    const { id, hr_comment } = req.body;

    // Start a transaction
    con.beginTransaction((err) => {
        if (err) {
            console.error("Failed to start transaction:", err);
            return res.json({ Status: false, Error: "Failed to start transaction: " + err.message });
        }

        const updateTransferRequestSql = `UPDATE transfer_request SET status = 'Rejected', hr_comment = ? WHERE id = ?`;

        con.query(updateTransferRequestSql, [hr_comment, parseInt(id)], (err, result) => {
            if (err) {
                console.error("Failed to update transfer_request:", err);
                return con.rollback(() => {
                    return res.json({ Status: false, Error: "Failed to update transfer_request: " + err.message });
                });
            }

            if (result.affectedRows === 0) {
                console.error("No rows were updated. Check if the ID exists in the database.");
                return con.rollback(() => {
                    return res.json({ Status: false, Error: "No rows were updated. Check if the ID exists in the database." });
                });
            }

            const deleteTransferScheduleSql = `DELETE FROM transfer_schedule WHERE employee_id = (SELECT employee_id FROM transfer_request WHERE id = ?)`;

            con.query(deleteTransferScheduleSql, [parseInt(id)], (err, result) => {
                if (err) {
                    console.error("Failed to delete transfer_schedule:", err);
                    return con.rollback(() => {
                        return res.json({ Status: false, Error: "Failed to delete transfer_schedule: " + err.message });
                    });
                }

                con.commit((err) => {
                    if (err) {
                        console.error("Failed to commit transaction:", err);
                        return con.rollback(() => {
                            return res.json({ Status: false, Error: "Failed to commit transaction: " + err.message });
                        });
                    }

                    console.log("Transaction completed successfully.");
                    return res.json({ Status: true });
                });
            });
        });
    });
});

router.get('/transfer_request_details', (req, res) => {
    const { id } = req.query;

    const sql = `
      SELECT tr.*, ts.*
      FROM transfer_request tr
      LEFT JOIN transfer_schedule ts ON tr.employee_id = ts.employee_id
      WHERE tr.id = ?
    `;

    con.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Failed to retrieve transfer request details:", err);
            return res.json({ Status: false, Error: "Failed to retrieve transfer request details: " + err.message });
        }
        if (result.length > 0) {
            return res.json({ Status: true, Result: result[0] });
        } else {
            return res.json({ Status: false, Error: "No results found" });
        }
    });
});

router.get('/transfer_request_details_emp_id', (req, res) => {
    const { employeeId } = req.query; // Changed from id to employeeId to clearly indicate the expected parameter

    const sql = `
      SELECT tr.*, ts.*
      FROM transfer_request tr
      LEFT JOIN transfer_schedule ts ON tr.employee_id = ts.employee_id
      WHERE tr.employee_id = ? 
    `;

    con.query(sql, [employeeId], (err, result) => { // Changed from id to employeeId
        if (err) {
            console.error("Failed to retrieve transfer request details:", err);
            return res.json({ Status: false, Error: "Failed to retrieve transfer request details: " + err.message });
        }
        if (result.length > 0) {
            return res.json({ Status: true, Result: result[0] });
        } else {
            return res.json({ Status: false, Error: "No results found" });
        }
    });
});


router.post('/delete_transfer_request', upload.none(), (req, res) => {
    const { employeeId } = req.body;

    if (!employeeId) {
        return res.status(400).json({ Status: false, Error: "Employee ID is required" });
    }

    // Start a transaction
    con.beginTransaction(err => {
        if (err) {
            console.error("Failed to start transaction:", err);
            return res.json({ Status: false, Error: "Transaction start failed: " + err.message });
        }

        // Delete from transfer_schedule first
        const deleteTransferScheduleSql = `DELETE FROM transfer_schedule WHERE employee_id = ?`;

        con.query(deleteTransferScheduleSql, [employeeId], (err, result) => {
            if (err) {
                console.error("Failed to delete from transfer_schedule:", err);
                return con.rollback(() => {
                    res.json({ Status: false, Error: "Failed to delete transfer_schedule: " + err.message });
                });
            }

            // Now delete from transfer_request
            const deleteTransferRequestSql = `DELETE FROM transfer_request WHERE employee_id = ?`;

            con.query(deleteTransferRequestSql, [employeeId], (err, result) => {
                if (err) {
                    console.error("Failed to delete from transfer_request:", err);
                    return con.rollback(() => {
                        res.json({ Status: false, Error: "Failed to delete transfer_request: " + err.message });
                    });
                }

                // Commit the transaction if all deletions are successful
                con.commit(err => {
                    if (err) {
                        console.error("Failed to commit transaction:", err);
                        return con.rollback(() => {
                            res.json({ Status: false, Error: "Transaction commit failed: " + err.message });
                        });
                    }

                    console.log("Transaction completed successfully.");
                    res.json({ Status: true, Message: "Employee transfer records deleted successfully" });
                });
            });
        });
    });
});


export { router as adminRouter };