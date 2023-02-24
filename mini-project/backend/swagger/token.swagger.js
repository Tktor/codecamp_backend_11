/**
 * @swagger
 * /tokens/phone:
 *   post:
 *     summary: 토큰 발급 받기
 *     tags: [Token]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "01045167940"
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: 123456 인증번호 전송에 성공하였습니다.
 *                   
 *
 *   patch:
 *     summary: 토큰 인증하기
 *     tags: [Token]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "01045167940"
 *               token:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: true
 *     responses:
 *       422:
 *         description: 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: false
 */