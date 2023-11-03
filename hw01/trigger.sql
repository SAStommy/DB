DELIMITER //
CREATE TRIGGER school_insert_trigger
BEFORE INSERT ON school FOR EACH ROW
BEGIN
    DECLARE last_id INT;
    DECLARE new_id VARCHAR(10);

    -- 查找最後一個學校的 ID
    SELECT MAX(CAST(SUBSTRING(id, 3) AS UNSIGNED)) INTO last_id FROM school;

    -- 如果沒有已有的學校，將新 ID 設置為 'TW0001'
    IF last_id IS NULL THEN
        SET new_id = 'TW0001';
    ELSE
        -- 否則，生成下一個 ID（加 1）
        SET new_id = CONCAT('TW', LPAD(last_id + 1, 4, '0'));
    END IF;

    -- 將新 ID 設置為插入的學校的 ID
    SET NEW.schoolID = new_id;
END;
//
DELIMITER ;
