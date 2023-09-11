function collision(level) {
    if (inMenu)
        return 0;
    if (levelMap[level] != null) {
        for (i = 0; i < levelMap[level].length; i++) {
            if (levelMap[level][i] > 0) {
                if (playerX + playerRadius >= i * objWidth && playerX - playerRadius <= i * objWidth + objWidth && playerY <= levelMap[level][i] + playerRadius) {
                    return 1;
                }
            } else if (levelMap[level][i] == 'l') {
                if (playerX + playerRadius >= i * objWidth && playerX - playerRadius <= i * objWidth + objWidth && playerY > 15 && playerY < 50) {
                    return 1;
                }
            } else if (levelMap[level][i] == 'm') {
                if (playerX + playerRadius >= i * objWidth && playerX - playerRadius <= i * objWidth + objWidth && playerY > 50 && playerY < 85) {
                    return 1;
                }
            } else if (levelMap[level][i] == 'h') {
                if (playerX + playerRadius >= i * objWidth && playerX - playerRadius <= i * objWidth + objWidth && playerY > 85 && playerY < 120) {
                    return 1;
                }
            } else if (levelMap[level][i] == '*') {
                if (playerX + playerRadius >= i * objWidth && playerX - playerRadius <= i * objWidth + objWidth && playerY > 85 && playerY < 120) {
                    return 2;
                }
            }
        }
    }
    return 0;
}
