import { ChangeEvent, useState, useEffect, FC } from 'react';
import { useRouter } from 'next/router'
import { postAuthData } from '../../services/auth'
import styles from './signup.module.css';
import LoadingPage from '../../components/atoms/Load/Load'
import { ApiResponse, DataLogin } from '@/services/api/response';
import ApiClient from '@/services/api/client';

const SignUpPage: FC = () => {
    const router = useRouter();
    const clientEntryPoint = "http://localhost:8080"
    const apiClient = new ApiClient(clientEntryPoint, "");

    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [usernameSubmitAttempted, setUsernameSubmitAttempted] = useState(false);
    const [passwordSubmitAttempted, setPasswordSubmitAttempted] = useState(false);
    const [confirmPasswordSubmitAttempted, setConfirmPasswordSubmitAttempted] = useState(false);
    const [hasSpecialCharacter, setHasSpecialCharactor] = useState(false);
    const [canSignup, setCanSignup] = useState(false)

    const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newUsername = e.target.value.slice(0, 15)
        setUsername(newUsername);
        if (hasSpecialCharacter && !/^[a-zA-Z0-9]*$/.test(newUsername)) return
        setHasSpecialCharactor(false)
        if (newUsername.length < 3) return
        setUsernameSubmitAttempted(false);
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value.slice(0, 15)
        setPassword(newPassword);
        if (newPassword.length < 6) return
        setPasswordSubmitAttempted(false);
    };
    
    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newConfirmPassword = e.target.value.slice(0, 15)
        setConfirmPassword(newConfirmPassword);
        if (newConfirmPassword !== password) return
        setConfirmPasswordSubmitAttempted(false);
    };

    const createErrorMessageForUsername = (): string => {
        if(hasSpecialCharacter) return "¥:{}[];<>?!`~ などの特殊文字を含めることはできません"
        return "3文字以上のユーザー名を入力してください"
    }

    const handleSignUp = (e: React.FormEvent) => {
        let canSubmitSignupFrom: boolean = true
        if (password.length < 6) {
            setPasswordSubmitAttempted(true);
            canSubmitSignupFrom = false
        }
        if (username.length < 3) {
            setUsernameSubmitAttempted(true);
            canSubmitSignupFrom = false
        }
        if (!/^[a-zA-Z0-9]*$/.test(username)) {
            setHasSpecialCharactor(true);
            canSubmitSignupFrom = false
        }
        if (confirmPassword != password) {
            setConfirmPasswordSubmitAttempted(true)
            canSubmitSignupFrom = false
        }
        if(!canSubmitSignupFrom) return
        e.preventDefault();
        const payload = {
            'username': username,
            'password': password,
        }
        apiClient.post<ApiResponse<any>>('signup', payload).then(response => {
            console.log(response)
            setCanSignup(true)
        }).catch(error => {
            console.log(error)
        })
    };

    useEffect(() => {
        if(!canSignup) return
        const redirectTimeout = setTimeout(() => {
            router.push('/auth/login');
        }, 1000);
    
        return () => clearTimeout(redirectTimeout);
    }, [canSignup])

    return (
        canSignup?
        <LoadingPage text='ログインページに移動しています...'/>
        :
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
                        {passwordSubmitAttempted && <div className={styles.error}>6文字以上のパスワードを入力してください</div>}
                    </div>
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>パスワード（確認用）</label>
                    <div className={styles.inputWithCounter}>
                        <input className={styles.input} type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                        <div className={styles.counter}>{confirmPassword.length}/15</div>
                    </div>
                    <div className={styles.errorContainer}>
                        {confirmPasswordSubmitAttempted  && <div className={styles.error}>パスワードが一致しません</div>}
                    </div>
                </div>
                <button className={styles.button} onClick={handleSignUp}>新規登録</button>
            </div>
        </div>
    );
};

export default SignUpPage;
