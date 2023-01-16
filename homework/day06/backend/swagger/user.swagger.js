/**
 * @swagger
 * /users:
 *   get:
 *     summary: 유저 정보 불러오기
 *     tags: [User]
 *     parameters:
 *       - in: 이름 입력
 *         name: name
 *         type: string
 *     responses:
 *       200:
 *         description: 성공입니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 properties:
 *                   email:
 *                     type: string
 *                     example: aaa@gamil.com
 *                   name:
 *                     type: string
 *                     example: 철수
 *                   phone:
 *                     type: string
 *                     example: 010-1234-5678
 *                   personal:
 *                     type: string
 *                     example: 220110-2222222
 *                   prefer:
 *                      type: string
 *                      example: http://naver.com
 *                  
 */
