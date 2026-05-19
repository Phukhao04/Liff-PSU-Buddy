const axios = require('axios')

module.exports = async (app, options) => {
  app.get(
    '/liff/student/activity-check',
    {
      preHandler: [app.verifyLiffToken],
    },
    async (req, res) => {
      try {
        const activity = await axios.get(
          // `https://transcript.psu.ac.th/transcript_api/api/student_events/6510210634`,
          `https://transcript.psu.ac.th/transcript_api/api/student_events/${req.user._id}`,
          {
            headers: {
              token: process.env.TRANSCRIPT_TOKEN,
            },
          },
        )
        let { hrsTarget, events } = activity.data
        // console.log(activity.data)
        return res.send({ hrsTarget, events })
      } catch (error) {
        console.log(error)
        return res.code(500).send({ message: 'Internal Server Error' })
      }
    },
  )
}
