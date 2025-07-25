const express = require('express')
const router = express.Router()


const {signup, login} = require('../controllers/Auth')
const {auth, isRole} = require('../middlewares/auth')

router.post('/signup',signup)
router.post('/login', login)

router.get('/student/dashboard', auth , isRole("Student") , (req,res)=>{
    res.json({
        success:true,
        message: "Welcome to the Student Dashboard"
    })
})

router.get('/admin/dashboard', auth , isRole("Admin") , (req,res)=>{
    res.json({
        success:true,
        message: "Welcome to the Admin Dashboard"
    })
})

module.exports = router;