export class Utils{
    public MAX_TOKEN_TIME = (5 * 6 *1000)
    static generateVerificationToken(digit: number =6){
        const digits = "0123456789"
        let otp = ""
        for(let i=0; i<digit; i++){
            otp += Math.floor(Math.random() *10)
        }
        return otp
    }
}