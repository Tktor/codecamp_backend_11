/**
 * @swagger
 * /Users:
 *   post:
 *     summary: 회원가입하기
 *     tags: [Users]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "김현준"
 *               email:
 *                 type: string
 *                 example: "supply9000@naver.com"
 *               personal:
 *                 type: string
 *                 example: "123456-1234567"
 *               prefer:
 *                 type: string
 *                 example: "http://www.naver.com"
 *               pwd:
 *                 type: string
 *                 example: "123456"
 *               phone:
 *                 type: string
 *                 example: "01012345678"
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: ab12cd34ef56tg78 (mongoDB id)
 * 
 * *     responses:
 *       422:
 *         description: 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: false
 *   get:
 *     summary: 유저정보 조회
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 properties:
 *                   og:
 *                     type: object
 *                     properties:
 *                       title:
 *                         type: string
 *                         example: "네이버"
 *                       description:
 *                         type: string
 *                         example: "네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요"
 *                       image:
 *                          type: string
 *                          example: "https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png"
 *                   _id:
 *                     type: string
 *                     example: "63cd231408f44eba51d1f29c"
 *                   name:
 *                     type: string
 *                     example: "김현준"
 *                   email:
 *                     type: string
 *                     example: "supply9000@naver.com"
 *                   personal:
 *                     type: string
 *                     example: "123456-1******"
 *                   prefer:
 *                     type: string
 *                     example: "https://naver.com"
 *                   pwd:
 *                     type: string
 *                     example: "123456"
 *                   phone:
 *                     type: string
 *                     example: "01012345678"
 *                   __v:
 *                     type: string
 *                     example: "0"
 * *     responses:
 *       422:
 *         description: 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: false
 */
