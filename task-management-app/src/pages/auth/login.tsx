import React, { useState } from 'react';
import Link from 'next/link';
import styles from './login.module.css';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameSubmitAttempted, setUsernameSubmitAttempted] = useState(false);
    const [passwordSubmitAttempted, setPasswordSubmitAttempted] = useState(false);
    const [hasSpecialCharacter, setHasSpecialCharactor] = useState(false);

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value.slice(0, 15));
        if (hasSpecialCharacter && !/^[a-zA-Z0-9]*$/.test(username)) return
        setHasSpecialCharactor(false)
        if (username.length < 3) return
        setUsernameSubmitAttempted(false);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value.slice(0, 15));
        if (password.length < 6) return
        setPasswordSubmitAttempted(false);
    };

    const createErrorMessageForUsername = (): string => {
        if(hasSpecialCharacter) return "¥:{}[];<>?!`~ などの特殊文字を含めることはできません"
        return "3文字以上のユーザー名を入力してください"
    }

    const handleLogin = (e: React.FormEvent) => {
        if (password.length < 6) setPasswordSubmitAttempted(true)
        if (username.length < 3) setUsernameSubmitAttempted(true)
        if (!/^[a-zA-Z0-9]*$/.test(username)) setHasSpecialCharactor(true)
        if (usernameSubmitAttempted || passwordSubmitAttempted || hasSpecialCharacter) return
        e.preventDefault();
        // TODO: ここで認証処理を行います
        console.log(`Username: ${username}, Password: ${password}`);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Welcome to KANBAN</h1>
            <div className={styles.loginForm}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>ユーザー名</label>
                    <div className={styles.inputWithCounter}>
                        <input className={styles.input} type="text" value={username} placeholder="例：flyg0n" onChange={handleUsernameChange} />
                        <div className={styles.counter}>{username.length}/15</div>
                    </div>
                    <div className={styles.errorContainer}>
                        {(usernameSubmitAttempted || hasSpecialCharacter) && <div className={styles.error}>{createErrorMessageForUsername()}</div>}
                    </div>
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>パスワード</label>
                    <div className={styles.inputWithCounter}>
                        <input className={styles.input} type="password" value={password} onChange={handlePasswordChange} />
                        <div className={styles.counter}>{password.length}/15</div>
                    </div>
                    <div className={styles.errorContainer}>
                        {passwordSubmitAttempted && password.length < 6 && <div className={styles.error}>6文字以上のパスワードを入力してください</div>}
                    </div>
                </div>
                <button className={styles.button} onClick={handleLogin}>ログイン</button>
                <div className={styles.signupLinkContainer}>
                    <p>新規登録の方は<Link href="/auth/signup">こちら</Link></p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;